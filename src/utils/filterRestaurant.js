export default function filterRestaurant(restaurant, filter) {
    const restInfo = restaurant?.info;
    switch (filter) {
        case 'Fast Delivery':
            return restInfo?.sla?.deliveryTime <= 35;
        case 'New on Swiggy':
            return restInfo?.externalRatings?.aggregatedRating?.rating === "--";
        case 'Pure Veg':
            return restInfo?.badges?.imageBadges?.length ? restInfo?.badges?.imageBadges[0]?.description === "pureveg" : false;
        case 'Offers':
            return restInfo?.aggregatedDiscountInfoV3?.header ? true : false;
        case 'Ratings 4.5+':
            return restInfo?.avgRating > 4.5;
        case 'Rs. 300-Rs. 600':
            return (restInfo?.costForTwo).split(" ")[0].slice(1) >= 300 & (restInfo?.costForTwo).split(" ")[0].slice(1) <= 600;
        default: return true;
    }
}