const IconPlusSmall = ({ stroke = '#000000' }: { fill?: string; stroke?: string }) => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.99999 1.16667V4.00001M3.99999 4.00001V6.83334M3.99999 4.00001H1.16666M3.99999 4.00001H6.83332"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconPlusSmall;
