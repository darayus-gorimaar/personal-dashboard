import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Buffer } from "buffer";

export default function Listening() {
  const clientId = "adef93cc1c794697b8cbf5f163d8d2df";
  const clientSecret = "959bb8b8475e4293a0eea8716407c0e8";

  async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    console.log("Access token: ", data.access_token);
    return data.access_token;
  }

  async function getAuthToken() {
    var client_id = "CLIENT_ID";
    var redirect_uri = "http://127.0.0.1:8888/callback";

    var app = express();

    app.get("/login", function (req, res) {
      var state = generateRandomString(16);
      var scope = "user-read-private user-read-email";

      res.redirect(
        "https://accounts.spotify.com/authorize?" +
          querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
          })
      );
    });
  }

  async function searchTrack(query) {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log("data = ", data?.tracks?.items);
  }

  async function getTopArtists() {
    const token = await getAccessToken();
    const url = "https://api.spotify.com/v1/me/top/artists";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Error fetching top artists:", response.statusText);
      return;
    }

    const data = await response.json();
    console.log(
      "Your Top Artists:",
      data.items.map((artist) => artist.name)
    );
  }

  useEffect(() => {
    getTopArtists();
    // searchTrack("Blinding Lights");
  }, []);

  return (
    <View>
      <Text>spotify</Text>
    </View>
  );
}
