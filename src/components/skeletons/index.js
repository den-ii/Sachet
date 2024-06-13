import "./styles.css";

export function TextSkeleton({ height = 13, width = 100, borderRadius = 5 }) {
  return (
    <div
      className="skeleton"
      style={{ width: width, height: height, borderRadius: borderRadius }}
    ></div>
  );
}

export function AvatarSkeleton({ height = 40, width = 40 }) {
  return (
    <div
      className="skeleton"
      style={{ width: width, height: height, borderRadius: "50%" }}
    ></div>
  );
}
