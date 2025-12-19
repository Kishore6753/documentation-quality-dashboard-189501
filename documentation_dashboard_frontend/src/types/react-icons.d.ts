declare module "react-icons" {
  import * as React from "react";

  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    title?: string;
  }

  /** Base icon component type used by react-icons packs. */
  export type IconType = (props: IconBaseProps) => React.ReactElement | null;
}

declare module "react-icons/*" {
  import { IconType } from "react-icons";

  const icons: Record<string, IconType>;
  export default icons;

  // Allow named exports like `FiSearch` from `react-icons/fi`
  export const FiActivity: IconType;
  export const FiAlertTriangle: IconType;
  export const FiArrowUpRight: IconType;
  export const FiBarChart2: IconType;
  export const FiCheckCircle: IconType;
  export const FiClock: IconType;
  export const FiFileText: IconType;
  export const FiFilter: IconType;
  export const FiFolder: IconType;
  export const FiInfo: IconType;
  export const FiLayout: IconType;
  export const FiPieChart: IconType;
  export const FiRefreshCcw: IconType;
  export const FiSearch: IconType;
  export const FiShield: IconType;
  export const FiSun: IconType;
  export const FiTrendingUp: IconType;
  export const FiZap: IconType;
}
