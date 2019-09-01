import React from 'react';
import {StaticMap} from 'react-map-gl'
// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import {PolygonLayer} from 'deck.gl'
// @ts-ignore
import {LineLayer} from '@deck.gl/layers';

// Viewport settings
const viewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 2,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const polygonData = [
  {
    contours: [
      [-91.72307036099997, 31.814196736000035],
      [-122.41669, 37.781],
      [-95.52274057225983, 30.131426214982195],
      [-91.72307036099997, 31.814196736000035]
    ],
    name: "firstPolygon"
  }
];

const layer = new PolygonLayer({
  id: "poly-layers",
  data: polygonData,
  stroked: true,
  filled: true,
  extruded: false,
  wireframe: true,
  lineWidthMinPixels: 1,
  getPolygon: (d: any) => d.contours,
  getLineColor: [80, 80, 80],
  getFillColor: [80, 80, 80],
  getLineWidth: 250
});

const App: React.FC = () => {

  const [style, setStyle] = React.useState<false | mapboxgl.Style>(false)

  React.useEffect(() => {
    fetch('https://api.geolonia.com/dev/styles/geolonia-basic-3d?key=YOUR-API-KEY')
    .then(res => res.json())
    .then(setStyle)
  }, [])

  return (
    <div className="App">
      <DeckGL viewState={viewState} layers={[layer]}>
        { style && <StaticMap width={'100%'} height={500} mapStyle={style}></StaticMap> }
      </DeckGL>
    </div>
  );
}

export default App;
