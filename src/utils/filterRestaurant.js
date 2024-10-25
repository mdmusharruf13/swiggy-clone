export default function filterRestaurant(restaurant, filter) {
    const restInfo = restaurant?.info;
    switch (filter) {
        case 'Fast Delivery': console.log(restInfo?.sla?.deliveryTime);
            return restInfo?.sla?.deliveryTime <= 35;
        case 'New on Swiggy': console.log(restInfo?.externalRatings?.aggregatedRating?.rating);
            return restInfo?.externalRatings?.aggregatedRating?.rating === "--";
        case 'Pure Veg': console.log(restInfo?.badges?.imageBadges && restInfo?.badges?.imageBadges[0].description);
            return restInfo?.badges?.imageBadges?.length ? restInfo?.badges?.imageBadges[0]?.description === "pureveg" : false;
        case 'Offers': console.log(restInfo?.aggregatedDiscountInfoV3);
            return restInfo?.aggregatedDiscountInfoV3?.header ? true : false;
        case 'Ratings 4.5+': console.log(restInfo?.avgRating);
            return restInfo?.avgRating > 4.5;
        case 'Rs. 300-Rs. 600': console.log((restInfo?.costForTwo).split(" ")[0].slice(1));
            return (restInfo?.costForTwo).split(" ")[0].slice(1) >= 300 & (restInfo?.costForTwo).split(" ")[0].slice(1) <= 600;
        default: return true;
    }
}