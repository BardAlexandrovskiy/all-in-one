import React from "react";

class NewsScreen extends React.Component {
  componentDidMount() {
    const url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=ua&" +
      "pageSize=100&" +
      "apiKey=10ade8962c444f4b9c9a49fd8f56589b";
    const req = new Request(url);
    fetch(req)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then((newsObject) => {
        console.log(newsObject);
      })
      .catch(() => "Error")
      .finally(() => console.log("The end"));
  }

  render() {
    return <div className="news-screen screen"></div>;
  }
}

export default NewsScreen;
