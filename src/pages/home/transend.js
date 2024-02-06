import React, { useEffect, useState } from "react";
import Transending from "../../shared/components/common/transending";
import { getTransendingArtist } from "../../shared/services";
function Transend() {
  const [TranArtist, setTranArtist] = useState([]);
  useEffect(() => {
    getTransendingArt();
  }, []);
  const getTransendingArt = () => {
    getTransendingArtist()
      .then(({ data }) => {
        if (data?.data.length > 0) {
          setTranArtist(data?.data);
        }
      })
      .catch((err) => {});
  };
  return <Transending TranArtist={TranArtist} />;
}

export default Transend;
