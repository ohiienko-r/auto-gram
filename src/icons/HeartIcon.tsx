import type { IconProps } from "@/types/app";

export default function HeartIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20.2843 13.3914L13.0814 20.8763C12.491 21.4898 11.509 21.4898 10.9186 20.8763L3.71573 13.3914C1.42809 11.0143 1.42809 7.16008 3.71573 4.78289C6.00337 2.4057 9.71236 2.4057 12 4.78289C14.2876 2.4057 17.9966 2.4057 20.2843 4.78289C22.5719 7.16008 22.5719 11.0143 20.2843 13.3914Z"
        stroke="#007DFD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
