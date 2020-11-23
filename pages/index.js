import React from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default class extends React.Component {
  static async getInitialProps() {
    if (!process.browser) {
      const res = await axios.get(
        "https://data-ui.football-data.org/fd/competitions/2021/table"
      );
      return { data: res.data };
    } else {
      return { data: JSON.parse(sessionStorage.getItem("bpl")) };
    }
  }

  componentDidMount() {
    if (!sessionStorage.getItem("bpl"))
      sessionStorage.setItem("bpl", JSON.stringify(this.props.data));
  }

  render() {
    return (
      <div>
        <Head>
          <title>League Table</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/purecss@0.6.1/build/pure-min.css"
          />
        </Head>
        <div className="pure-g">
          <div className="pure-u-1-3"></div>
          <div className="pure-u-1-3">
            <h1>Barclays Premier League</h1>
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.data.map((standing, i) => {
                  const oddOrNot = i % 2 == 1 ? "pure-table-odd" : "";
                  return (
                    <tr key={i} className={oddOrNot}>
                      <td>{standing.position}</td>
                      <td>
                        <img
                          className="pure-img logo"
                          src={standing.team.crestUrl}
                        />
                      </td>
                      <td>{standing.playedGames}</td>
                      <td>{standing.won}</td>
                      <td>{standing.draw}</td>
                      <td>{standing.lost}</td>
                      <td>{standing.goalsFor}</td>
                      <td>{standing.goalsAgainst}</td>
                      <td>{standing.goalDifference}</td>
                      <td>{standing.points}</td>
                      <td>
                        <Link href={`/details?id=${standing.position}`}>
                          More...
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
