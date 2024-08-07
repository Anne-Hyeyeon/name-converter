import React from "react";

const CoupangBanner: React.FC = () => {
 return (
  <div
   dangerouslySetInnerHTML={{
    __html: `
        <script src="https://ads-partners.coupang.com/g.js"></script>
        <script>
          new PartnersCoupang.G({
            "id": 795759,
            "template": "carousel",
            "trackingCode": "AF1619259",
            "width": "300",
            "height": "140",
            "tsource": ""
          });
        </script>
      `,
   }}
  />
 );
};

export default CoupangBanner;
