import "./Footer.css";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name-surname">Developed by Name Surname</p>
      <p className="footer__date">{currentYear}</p>
    </footer>
  );
}

export default Footer;
