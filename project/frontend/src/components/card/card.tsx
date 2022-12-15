import {CardCompInterface} from "../../interfaces/card";
import {CardStyle, CardStyleHoriz} from "./cardStyle";
import {useDeliverCard} from "../../store/features/hooks/useDeliverCard";

export function CardComponent({card, src, alt, playerIndex}:CardCompInterface) {
    const {fromPlayerToDeck, fromDeckToPlayer} = useDeliverCard();

    const handleClick = () => {
        // if > 4 it comes from deck else it is from player
        if (playerIndex > 4) {
            fromDeckToPlayer(card);
        } else {
           fromPlayerToDeck(card);
        }
    };


    if (playerIndex % 2 !== 0) {
        return <CardStyleHoriz src={src} alt={alt}/>
    } else {
        return <CardStyle
            playerIndex={playerIndex}
            onClick={handleClick}
            src={src}
            alt={alt}/>;
    }
};