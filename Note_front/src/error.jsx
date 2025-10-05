import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",


        justifyContent: "center",

        flexDirection: "column",
        marginTop:"12%",
        gap:"1rem"
      }}
    >
      <h1>404 - Page Not found</h1>
      <p>Page you looking for does not exist</p>
      <Link to="/">Go to home page</Link>
    </div>
  );
}


