import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { saveAs } from "file-saver";
import MoonLoader from "react-spinners/MoonLoader";

import "./style/itemsgrid.scss";

function ItemsGrid() {
  const [list, setList] = useState(null);
  const [copy, setCopy] = useState(false);

  let listItems = [
    {
      id: 1,
      name: "meme-data-0",
      categori: ["dance", "dancing", "party"],
      url: "http://pm1.narvii.com/7237/a8794083a647906a86e100a1698343ff8408599fr1-750-750v2_uhq.jpg",
    },
    {
      id: 2,
      name: "meme-data-1",
      categori: ["dance", "dancing", "party"],
      url: "https://memegenerator.net/img/instances/70946713.jpg",
    },
    {
      id: 3,
      name: "meme-data-2",
      categori: ["dance", "dancing", "party"],
      url: "https://i.pinimg.com/originals/9f/f1/f4/9ff1f46a9cd3ce7c6ade69778653959f.jpg",
    },
    {
      id: 4,
      name: "meme-data-3",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxUAp9YD2gyt5wmzea1NH7fBYUpS136nQce-8BeU-aW-HsSPAJMk1bS4yY_2P0NmaR5Y&usqp=CAU",
    },
    {
      id: 5,
      name: "meme-data-4",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://ephesossoftware.com/img/images/the-18-best-happy-birthday-memes-to-brighten-someones-day_7.jpg",
    },
    {
      id: 6,
      name: "meme-data-5",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://cdn.themix.org.uk/uploads/2016/03/im-just-so-happy-meme.png",
    },
    {
      id: 1,
      name: "meme-data-0",
      categori: ["dance", "dancing", "party"],
      url: "http://pm1.narvii.com/7237/a8794083a647906a86e100a1698343ff8408599fr1-750-750v2_uhq.jpg",
    },
    {
      id: 2,
      name: "meme-data-1",
      categori: ["dance", "dancing", "party"],
      url: "https://memegenerator.net/img/instances/70946713.jpg",
    },
    {
      id: 3,
      name: "meme-data-2",
      categori: ["dance", "dancing", "party"],
      url: "https://i.pinimg.com/originals/9f/f1/f4/9ff1f46a9cd3ce7c6ade69778653959f.jpg",
    },
    {
      id: 4,
      name: "meme-data-3",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxUAp9YD2gyt5wmzea1NH7fBYUpS136nQce-8BeU-aW-HsSPAJMk1bS4yY_2P0NmaR5Y&usqp=CAU",
    },
    {
      id: 5,
      name: "meme-data-4",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://ephesossoftware.com/img/images/the-18-best-happy-birthday-memes-to-brighten-someones-day_7.jpg",
    },
    {
      id: 6,
      name: "meme-data-5",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://cdn.themix.org.uk/uploads/2016/03/im-just-so-happy-meme.png",
    },
    {
      id: 1,
      name: "meme-data-0",
      categori: ["dance", "dancing", "party"],
      url: "http://pm1.narvii.com/7237/a8794083a647906a86e100a1698343ff8408599fr1-750-750v2_uhq.jpg",
    },
    {
      id: 2,
      name: "meme-data-1",
      categori: ["dance", "dancing", "party"],
      url: "https://memegenerator.net/img/instances/70946713.jpg",
    },
    {
      id: 3,
      name: "meme-data-2",
      categori: ["dance", "dancing", "party"],
      url: "https://i.pinimg.com/originals/9f/f1/f4/9ff1f46a9cd3ce7c6ade69778653959f.jpg",
    },
    {
      id: 4,
      name: "meme-data-3",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxUAp9YD2gyt5wmzea1NH7fBYUpS136nQce-8BeU-aW-HsSPAJMk1bS4yY_2P0NmaR5Y&usqp=CAU",
    },
    {
      id: 5,
      name: "meme-data-4",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://ephesossoftware.com/img/images/the-18-best-happy-birthday-memes-to-brighten-someones-day_7.jpg",
    },
    {
      id: 6,
      name: "meme-data-5",
      categori: ["Smile", "Happy", "Emotion"],
      url: "https://cdn.themix.org.uk/uploads/2016/03/im-just-so-happy-meme.png",
    },
  ];

  useEffect(() => {
    setList(listItems);
  }, []);

  const downloadImage = (url, name) => {
    saveAs(url, name);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopy(true);
  };

  const override = css`
    margin-top: 100px;
  `;

  return (
    <div className="items-container">
      <section className="header">
        <h1>Memes found for "Dancing"</h1>
        <div className="filters-container">
          <label className="realistic">
            Realistic
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>

          <label className="drawing">
            Drawing
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>

          <label className="colorfull">
            Colorfull
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>
        </div>
      </section>

      <section className="list-grid">
        {list ? (
          list.map((item) => {
            return (
              <>
                <div className="item">
                  <img
                    src={item.url}
                    alt=""
                    onClick={() => handleCopy(item.url)}
                  />
                </div>
              </>
            );
          })
        ) : (
          <MoonLoader size="25" color="#000" margin="100px" css={override} />
        )}
      </section>
    </div>
  );
}

export default ItemsGrid;
