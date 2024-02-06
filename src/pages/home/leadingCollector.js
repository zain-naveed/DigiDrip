import React, { useEffect, useState } from "react";
import Transending from "../../shared/components/common/transending";
import { getLeadingCollectors } from "../../shared/services";
function LeadingCollector() {
  const [TranArtist, setTranArtist] = useState([]);
  useEffect(() => {
    getTransendingArt();
  }, []);
  const getTransendingArt = () => {
    getLeadingCollectors()
      .then(({ data }) => {
        if (data?.data.length > 0) {
          console.log(data?.data);
          setTranArtist(data?.data);
        }
      })
      .catch((err) => {});
  };

  return <Transending TranArtist={TranArtist} />;
}

export default LeadingCollector;
