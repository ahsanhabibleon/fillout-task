const IconDuplicate = ({ stroke = '#9DA4B2' }: { fill?: string; stroke?: string }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.16667 5.16667V3.16667C5.16667 2.79848 5.46514 2.5 5.83333 2.5H12.8333C13.2015 2.5 13.5 2.79848 13.5 3.16667V10.1733C13.5 10.5415 13.2015 10.84 12.8333 10.84H10.8333M2.5 5.83333V12.8333C2.5 13.2015 2.79848 13.5 3.16667 13.5H10.1667C10.5349 13.5 10.8333 13.2015 10.8333 12.8333V5.83333C10.8333 5.46514 10.5349 5.16667 10.1667 5.16667H3.16667C2.79848 5.16667 2.5 5.46514 2.5 5.83333Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDuplicate;
