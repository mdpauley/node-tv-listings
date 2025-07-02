import "dotenv/config";
import axios from "axios";
const baseUrl = "https://api.tvmedia.ca/tv/v4/";

class TVListings {
  constructor(options) {
    if (!(this instanceof TVListings)) {
      throw new Error("Constructor must be called with new");
    }

    this.apiKey = process.env.YOUR_TVMEDIA_KEY || options.apiKey;

    if (!this.apiKey) {
      throw new Error("API key is required");
    }

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      responseType: "json",
      params: {
        api_key: this.apiKey,
      },
    });
  }

  async getLineups(options) {
    if (!options.postalCode) {
      throw new Error("A postalCode is required.");
    }
    try {
      const lineups = await this.axiosInstance.get("/lineups", {
        params: {
          postalCode: options.postalCode,
          providerID: options.providerID,
          lineupType: options.lineupType,
        },
      });
      if (!lineups.data) {
        throw new Error("No data returned from API");
      } else {
        return lineups.data;
      }
    } catch (error) {
      const errorMessage = `Failed to fetch lineups: ${error.message}`;
      throw new Error(errorMessage);
    }
  }

  async getLineup(options) {
    if (!options.lineupID) {
      throw new Error("The lineup ID is required.");
    }
    try {
      const lineup = await this.axiosInstance.get(
        `/lineups/${options.lineupID}`
      );
      if (!lineup.data) {
        throw new Error("No data returned from API");
      } else {
        return lineup.data;
      }
    } catch (error) {
      const errorMessage = `Failed to fetch lineup: ${error.message}`;
      throw new Error(errorMessage);
    }
  }

  async getListings(options) {
    if (!options.lineupID) {
      return callback("The lineupID is required.");
    }
    try {
      const listings = await this.axiosInstance.get(
        `/lineups/${options.lineupID}`,
        {
          params: {
            start: options.start,
            end: options.end,
            detail: options.detail,
          },
        }
      );
      if (!listings.data) {
        throw new Error("No data returned from API");
      } else {
        return listings.data;
      }
    } catch (error) {
      const errorMessage = `Failed to fetch listings: ${error.message}`;
      throw new Error(errorMessage);
    }
  }

  async getListingsChrono(options) {
    if (!options.lineupID) {
      return callback("The lineupID is required.");
    }
    try {
      const listingsChrono = await this.axiosInstance.get(
        `/lineups/${options.lineupID}/listings/chrono`,
        {
          params: {
            start: options.start,
            end: options.end,
            showtype: options.showtype,
            league: options.league,
            sportEventsOnly: options.sportEventsOnly,
            newShowsOnly: options.newShowsOnly,
            detail: options.detail,
          },
        }
      );
      if (!listingsChrono.data) {
        throw new Error("No data returned from API");
      } else {
        return listingsChrono.data;
      }
    } catch (error) {
      const errorMessage = `Failed to fetch listings chronologically: ${error.message}`;
      throw new Error(errorMessage);
    }
  }

  async getStation(options) {
    if (!options.stationID) {
      return callback("The stationID is required.");
    }
    try {
      const station = await this.axiosInstance.get(
        `/stations/${options.stationID}`
      );

      station.data.forEach((item) => {
        if (item.logoFilename) {
          item.logoL =
            "http://api.tvmedia.ca/images/stations/100x100/" +
            item.logoFilename;
          item.logoM =
            "http://api.tvmedia.ca/images/stations/76x28/" + item.logoFilename;
          item.logoS =
            "http://api.tvmedia.ca/images/stations/75x16/" + item.logoFilename;
        }
      });

      if (!station.data) {
        throw new Error("No data returned from API");
      } else {
        station.data.forEach((item) => {
          if (item.logoFilename) {
            item.logoL =
              "http://api.tvmedia.ca/images/stations/100x100/" +
              item.logoFilename;
            item.logoM =
              "http://api.tvmedia.ca/images/stations/76x28/" +
              item.logoFilename;
            item.logoS =
              "http://api.tvmedia.ca/images/stations/75x16/" +
              item.logoFilename;
          }
        });
        return station.data;
      }
    } catch (error) {
      const errorMessage = `Failed to fetch station: ${error.message}`;
      throw new Error(errorMessage);
    }
  }

  async getStationListings(options) {
    if (!options.stationID) {
      return callback("stationID is required.");
    }
    try {
      const stationListings = await this.axiosInstance.get(
        `/stations/${options.stationID}/listings`,
        {
          params: {
            start: options.start,
            end: options.end,
            showtype: options.showtype,
            league: options.league,
            detail: options.detail,
          },
        }
      );

      if (!stationListings.data) {
        throw new Error("No data returned from API");
      } else {
        stationListings.data.forEach((item) => {
          if (item.logoFilename) {
            item.logoL =
              "http://api.tvmedia.ca/images/stations/100x100/" +
              item.logoFilename;
            item.logoM =
              "http://api.tvmedia.ca/images/stations/76x28/" +
              item.logoFilename;
            item.logoS =
              "http://api.tvmedia.ca/images/stations/75x16/" +
              item.logoFilename;
          }
        });
        return stationListings.data;
      }
    } catch (error) {
      const errorMessage = `Failed to fetch station listings: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
}

export default TVListings;
