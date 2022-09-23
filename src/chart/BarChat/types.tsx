import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select,
} from "d3";
export interface IData {
  label: string;
  value: number;
}
interface BarChartProps {
  data: IData[];
}
export interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

export interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

export interface BarsProps {
  data: BarChartProps["data"];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
  onMouseOutCallback: any;
  onMouseOverCallback: any;
}
