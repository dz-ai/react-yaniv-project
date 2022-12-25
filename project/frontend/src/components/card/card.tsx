import {ICardCompInterface} from "../../interfaces/ICard";
import {CardStyleHover, CardStyleHoriz, CardStyle} from "./cardStyleHover";
import {useDeliverCard} from "../../Hooks-and-Util/useDeliverCard";
import {useGameStateIndex} from "../../store/features/gameSlice/useGameStateIndex";

export function CardComponent({isYourTurn, card, src, alt, playerIndex}: ICardCompInterface) {
    const {fromPlayerToDeck, fromDeckToPlayer} = useDeliverCard();
    const {gameState, gameStateFun} = useGameStateIndex();
    const {throwCountUp} = gameStateFun;

    const handleClick = () => {
        // if > 4 it comes from deck else it is from player
        if (playerIndex > 4) {
            fromDeckToPlayer(card);
        } else {
            throwCountUp();
            fromPlayerToDeck(card);
        }
    };


    if (playerIndex % 2 !== 0) {
        return <CardStyleHoriz src={src} alt={alt}/>
    } else {
        if (gameState.gameIsOn && isYourTurn && card.cardRule) {
            return <CardStyleHover
                playerIndex={playerIndex}
                onClick={handleClick}
                src={src}
                alt={alt}/>;
        } else {
            return <CardStyle
                playerIndex={playerIndex}
                src={src}
                alt={alt}/>;
        }
    }
}