import { Link } from "react-router-dom";
import Button from "../components/Button";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-page-root animate-fade-in">
      <div className="notfound-card card-glass">
        <div className="notfound-icon">☕💔</div>
        <span className="notfound-code">404</span>
        <h2>Spilled Coffee! Page Not Found</h2>
        <p>
          It seems the page or roast you are searching for has been moved or drunk already.
          Let's guide you back to our cozy main table.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
