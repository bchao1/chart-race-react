# `chart-race-react`
> 📊 Seamless & fully customizable bar chart race component for React. 
<br>
<p align=center>
    <img src="./assets/demo_icon.gif" width="800">
</p>

## Quick Start
```
npm install --save chart-race-react
```
```javascript
import { BarChart } from 'chart-race-react';
```
You should wrap `BarChart` inside a container `div` that acts as a sandbox. The width of the `BarChart` fits the container width.
```jsx
<div style={{width: "500px"}}>
    <BarChart />
</div>
```
## Usage 
> Passing props.

You will need to pass your own props to the `BarChart` component.
|Prop|Type|Explanation|
|---|---|---|
|**data**|Object|An object with keys being the data field name and value being Array data. `data[key].length` should be equal to **len**.|
|**timeline**|Array|An array defining the time indices. Length should be equal to **len**.|
|**labels**|Object|An object with keys being the data field name and value being the HTML element that acts as the data field's label.|
|**colors**|Object|An object with keys being the data field name and value being the color the data bar.|
|**len**|Integer|Length of the time indices.|
|**timeout**|Integer|Transition time between adjacent time indices (in ms).|
|**delay**|Integer|Waiting time between adjacent time indices (in ms).|
|**timelineStyle**|Object|CSS style objects for time indices.|
|**textBoxStyle**|Object|CSS style objects for data text.|
|**barStyle**|Object|Object defining the `height` of each bar and the `offset` between adjacent bars.|
|**width**|Array|Defines the width allocation for label, bar, and text box. Values in **width** should add up to 100.|
|**maxItems**|Integer|Defines the maximum number of items to show in the chart. Should be less or equal to `Object.keys(data).length`.|

## More Demo 
> Define text styles, colors, duration, and layout with grace.
<br>
<p align=center>
    <img src="./assets/demo.gif" width="800">
</p>