import React from "react";

export const NestedArray = () => {
  const results = [
    {
      ID: "shops",
      Shopping: [
        { ID: "food.order", Name: "Food" },
        { ID: "drink.order", Name: "Drink" }
      ]
    },
    {
      ID: "fun",
      Sports: [
        { ID: "play.basketball", Name: "Basketball" },
        { ID: "play.soccer", Name: "Soccer" }
      ]
    }
  ];

  const door =
  {
    ID: "605845a12f019e1f271f440a",
    price: 768,
    colors: [
      {
        _id: "605845a12f019e1f271f440b",
        colorName: "Virgin",
        colorUrl: "https://elporta.by/storage/colors/5c815e17b5b427.49753427.jpg"

      },
      {
        _id: "605845a12f019e1f271f440c",
        colorName: "Milk Oak",
        colorUrl: "https://elporta.by/storage/colors/5c815b090422c5.29655881.jpg"
      },
      {
        _id: "605845a12f019e1f271f440d",
        colorName: "Chalet Grande",
        colorUrl: "https://elporta.by/storage/colors/5d4d826dbc1a83.21178643.jpg"
      }
    ]
  }



  return (
    <div>
      <ul>
        {
          // results.map((data, i) =>
          Object.keys(door)
            .filter((x) => Array.isArray(door[x]))
            //map  по colors: 
            .map((key) => (<div key={door.ID}>
              <li>
                {/* key=colors */}
                <b>{key}:</b>
              </li>
              <ul>
                {door[key].map((item) => (
                  <li key={item._id}>
                    <div>{item.colorName}</div>
                    <img style={{ height: '100px' }} src={item.colorUrl} />
                  </li>
                ))}
              </ul>
            </div>
            ))
          // )
        }
      </ul>
      <ul>
        {/* {results.map((data, i) =>
          Object.keys(data)
            .filter((x) => Array.isArray(data[x]))
            .map((key) => (<div key={data.ID}>
              <li>
                <b>{key}:</b>
              </li>
              <ul>
                {data[key].map((item) => (
                  <li key={item.ID}>{item.Name}</li>
                ))}
              </ul>
            </div>
            ))
        )} */}
      </ul>
    </div>
  );
};

