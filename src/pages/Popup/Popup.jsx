import React, { useEffect, useState } from 'react';
import './Popup.css';
import { extractHostname, getLocalIPs, replaceHostname } from '../../../utils';
import QRCode from 'qrcode.react';

const Popup = () => {
  const [path, setPath] = useState(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      // use `url` here inside the callback because it's asynchronous!
      if (url) {
        const isLocalhost = extractHostname(url);
        if (isLocalhost === 'localhost') {
          getLocalIPs(function (ips) {
            setPath(replaceHostname(url, ips[0]));
          });
        } else {
          setPath(url);
        }
      }
    });
  }, []);

  return (
    <div className="App">
      {path && <QRCode includeMargin value={path} size={250} />}
    </div>
  );
};

export default Popup;
