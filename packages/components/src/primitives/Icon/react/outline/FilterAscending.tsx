import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgFilterAscending = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4v16m0 0-3-3m3 3 3-3m5-7 .5-1.5m0 0 1.192-3.902a.844.844 0 0 1 1.616 0L19.5 8.5m-4 0h4m0 0L20 10m-5 4h5l-5 6h5"
    />
  </Svg>
);
export default SvgFilterAscending;
