import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgBallFootball = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m8.82 3.578 2.004 1.456a2 2 0 0 0 2.352 0l2.004-1.456m-6.36 0A8.98 8.98 0 0 1 12 3a8.98 8.98 0 0 1 3.18.578m-6.36 0a9.022 9.022 0 0 0-3.846 2.797m0 0A8.962 8.962 0 0 0 3.01 12.42m1.964-6.045.765 2.354a2 2 0 0 1-.727 2.237L3.01 12.42m0 0a8.951 8.951 0 0 0 1.469 4.524m0 0h2.476a2 2 0 0 1 1.902 1.382l.765 2.357M4.48 16.944a9.016 9.016 0 0 0 5.143 3.739m0 0A9.01 9.01 0 0 0 12 21c.823 0 1.62-.11 2.378-.317m0 0 .765-2.357a2 2 0 0 1 1.902-1.382h2.476m-5.143 3.739a9.016 9.016 0 0 0 5.143-3.739m0 0a8.952 8.952 0 0 0 1.47-4.524m0 0a8.962 8.962 0 0 0-1.964-6.045m1.963 6.045-2.002-1.454a2 2 0 0 1-.727-2.237l.765-2.354m0 0a9.022 9.022 0 0 0-3.846-2.797m-5.584 8.877.192.59a2 2 0 0 0 1.902 1.382h.62a2 2 0 0 0 1.902-1.382l.192-.59a2 2 0 0 0-.726-2.236l-.502-.365a2 2 0 0 0-2.352 0l-.502.365a2 2 0 0 0-.726 2.236Z"
    />
  </Svg>
);
export default SvgBallFootball;
