import "./style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="media">
        <h1 className="logo">Yol-Üstü</h1>
        <div className="icons">
          <a href="https://www.tiktok.com/@dostlar0101" className="tt"></a>
          <a href="" className="ins"></a>
          <a href="https://wa.me/number" className="wha"></a>
        </div>
      </div>
      <div className="line"></div>
      <div className="about">
        <div className="phone">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-phone-icon-svg-download-png-444904.png?f=webp&w=16"
            alt=""
          />
          <a href="tel:somenumber">somenumber</a>
        </div>
        <div className="location">
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/location-icon-svg-download-png-2235638.png?f=webp&w=16"
            alt=""
          />
          <a href="https://www.google.com/maps?q=40.2429828,49.6001982&z=17&hl=ru">
            "Yol Üstü" Restoran, Azərbaycan, Bakı, Qaradağ Rayonu Səlyan Şosesi 31 km
            "TamStore" marketin yanı
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
