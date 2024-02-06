import Driptivity from "../../pages/Driptivity/Driptivity";
import EditProfile from "../../pages/profile/EditProfile";
import Offers from "../../pages/dashboard/Offers";
import Tour from "../../pages/tour/Tour";
import SteezDesigns from "../../pages/SteezDesigns";
import PastelPath from "../../pages/pastel/PastelPath";
import AuctionDetail from "../../pages/tour/auction/AuctionDetail";
import MarketDetail from "../../pages/tour/market/marketDetail";
import Home from "../../pages/home/Home";

import SearchPage from "../../pages/search/Search";
import CollectionDetail from "../../pages/profile/collection/CollectionDetail";
import EditCollectionArt from "../../pages/profile/collection/EditCollectionArt";
import CreateCollection from "../../pages/createCollection/createCollection";
import OpenCollection from "../../pages/openPages/openCollection";
import OpenListArt from "../../pages/openPages/openlistArt";
import ViewProfile from "../../pages/profile/viewProfile";

let allPublicRoute = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/driptivity",
    component: Driptivity,
    name: "Driptivity",
  },
  {
    path: "/tour",
    component: Tour,
    name: "Tour",
  },
  {
    path: "/work",
    component: SteezDesigns,
    name: "How its Works",
  },
  {
    path: "/pastelpath",
    component: PastelPath,
    name: "Pastel Path",
  },
  {
    path: "/search",
    component: SearchPage,
    name: "Search",
  },
  {
    path: "/collections",
    component: OpenCollection,
    name: "Open Collection",
  },
  {
    path: "/artworks/:id",
    component: OpenListArt,
    name: "List Arts",
  },
  {
    path: "/auction/:id",
    component: AuctionDetail,
    name: "Auction Art Detail",
  },
  {
    path: "/sale/:id",
    component: MarketDetail,
    name: "Sale Art Detail",
  },
  {
    path: "/viewProfile/:id",
    component: ViewProfile,
    name: "Profile",
  },
  {
    path: "/nftcollection/:id",
    component: CollectionDetail,
    name: "NFTCollection",
  },
  {
    path: "/Collection/:id/edit/:id",
    component: EditCollectionArt,
    name: "Collection Detail",
  },
  {
    path: "/Art/:id",
    component: EditCollectionArt,
    name: "Art Detail",
  },
];
let logedInRoute = [
  {
    path: "/collections",
    component: OpenCollection,
    name: "Open Collectin",
  },
  {
    path: "/work",
    component: SteezDesigns,
    name: "How its Works",
  },
  {
    path: "/profile",
    component: EditProfile,
    name: "Activity",
  },
  {
    path: "/viewProfile/:id",
    component: ViewProfile,
    name: "Profile",
  },
  {
    path: "/offers",
    component: Offers,
    name: "Dashboard",
  },
  {
    path: "/nftcollection/:id",
    component: CollectionDetail,
    name: "NFTCollection",
  },
  {
    path: "/Collection/:id/edit/:id",
    component: EditCollectionArt,
    name: "Collection Detail",
  },
  {
    path: "/Art/:id",
    component: EditCollectionArt,
    name: "Art Detail",
  },
  {
    path: "/artworks/:id",
    component: OpenListArt,
    name: "List Arts",
  },
  {
    path: "/create-collection",
    component: CreateCollection,
    name: "Create Collection",
  },
  {
    path: "/auction/:id",
    component: AuctionDetail,
    name: "Auction Art Detail",
  },
  {
    path: "/sale/:id",
    component: MarketDetail,
    name: "Sale Art Detail",
  },
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/driptivity",
    component: Driptivity,
    name: "Driptivity",
  },
  {
    path: "/tour",
    component: Tour,
    name: "Tour",
  },
  {
    path: "/search",
    component: SearchPage,
    name: "Search",
  },
];
export { allPublicRoute, logedInRoute };
