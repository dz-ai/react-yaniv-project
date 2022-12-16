import {ICardCompInterface} from "../../interfaces/ICard";
import {CardStyleHover, CardStyleHoriz, CardStyle} from "./cardStyleHover";
import {useDeliverCard} from "../../store/features/hooks/useDeliverCard";
import {useGameStateIndex} from "../../store/features/gameSlice/useGameStateIndex";

export function CardComponent({isYourTurn, card, src, alt, playerIndex}: ICardCompInterface) {
    const {fromPlayerToDeck, fromDeckToPlayer} = useDeliverCard();
    const {gameState} = useGameStateIndex();

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
        if (gameState.gameIsOn && isYourTurn) {
            return <CardStyleHover
                playerIndex={playerIndex}
                onClick={handleClick}
                src={src}
                alt={alt}/>;
        } else {
            return <CardStyle
                playerIndex={playerIndex}
                onClick={handleClick}
                src={src}
                alt={alt}/>;
        }
    }
};