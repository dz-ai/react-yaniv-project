import {getCard, usePlayersCards} from "../hooks/usePlayersCards";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Player} from "../components/player/player";
import {CardComponent} from "../components/card/card";
import {GamePageContainer, MainGameContainer, UpAndDownPlayersCont, SideCont, Deck} from "./gamePageStyle";
import {useAppDispatch, useAppSelector} from "../store/features/hooks/reduxHooks";
import {addToDeck} from "../store/features/gameSlice/gameSlice";
import {initPlayers} from "../store/features/playersSlice/playersSlice";
import {ICard} from "../interfaces/ICard";
import {IPlayer} from "../interfaces/IPlayer";
import {useGameStateIndex} from "../store/features/gameSlice/useGameStateIndex";
import {useWhoIsTurn} from "../store/features/gameSlice/useWhoIsTurn";

export function GamePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const yourName = location.state.yourName;
    const numOfPlayers = location.state.numOfPlayers

    const dispatch = useAppDispatch();
    const whoIsTurnFun = useWhoIsTurn();

    const {gameState} = useGameStateIndex();
    const {whoIsTurn} = gameState;
    const currentPlayer = useAppSelector(state => state.playersSlice);
    const deck = useAppSelector(state => state.gameSlice.deck);

    const {players, cards} = usePlayersCards(yourName, numOfPlayers);

    const [isFirstRound, setIsFirstRound] = useState(true);
    const [playersList, setPlayersList] = useState<IPlayer[]>([]);
    const [showStartGameButton, setShowStartGameButton] = useState(true);

    const handleTurn = useCallback(() => {
                whoIsTurnFun(playersList.length, isFirstRound);
                isFirstRound && setIsFirstRound(false);
            }
        ,[gameState.whoIsTurn, isFirstRound, playersList.length]);

    useEffect(() => {
        whoIsTurnFun(numOfPlayers, isFirstRound);
        isFirstRound && setIsFirstRound(false);
    }, []);

    useEffect(() => {
        console.log(whoIsTurn);
        console.log(currentPlayer);
    }, [whoIsTurn, currentPlayer]);

    useEffect(() => {
        setPlayersList(players);
    }, [currentPlayer, players]);

    useEffect(() => {
        dispatch(initPlayers(playersList[whoIsTurn]));
    }, [playersList, whoIsTurn]);

    useEffect(() => {
        playersList[whoIsTurn] = currentPlayer;
        setPlayersList([...playersList]);
    }, [currentPlayer]);

    const handleStateGame = (): void => {
        setShowStartGameButton(false);
        const card: ICard = getCard(cards);
        dispatch(addToDeck(card));
    };

    return (
        <GamePageContainer>

            <header style={{border: '3px solid gray'}}>
                Game
                <button onClick={() => navigate(-1)}>Reset Game</button>
                <button onClick={handleTurn}>turn</button>
            </header>

            <MainGameContainer style={{border: '3px solid gray'}}>
                <SideCont style={{border: '3px solid blue'}}>
                    {playersList[1] &&  <Player player={playersList[1]} isYou={false} playerIndex={1}/>}
                </SideCont>

                <UpAndDownPlayersCont style={{border: '3px solid purple'}}>
                    <div style={{border: '3px solid red'}}>
                        {playersList[2] && <Player player={playersList[2]} isYou={false} playerIndex={2}/>}
                    </div>
                    {/* TODO make it to separate component*/}
                    <Deck>
                        {showStartGameButton && <button onClick={handleStateGame}>Start Game</button>}
                        {!showStartGameButton &&
                            deck.map(card =>
                                <CardComponent
                                    card={card}
                                    key={`${card.num}${card.symbol}`}
                                    src={`../../cardsImages/${card.symbol}/${card.num}.png`}
                                    alt={'deck cards'}
                                    playerIndex={6}/>)
                        }
                    </Deck>

                    <div style={{border: '3px solid red'}}>
                        {playersList[0] && <Player player={playersList[0]} isYou={true} playerIndex={0}/>}
                    </div>
                </UpAndDownPlayersCont>

                <SideCont style={{border: '3px solid blue'}}>
                    {playersList[3] && <Player player={playersList[3]} isYou={false} playerIndex={3}/>}
                </SideCont>
            </MainGameContainer>

        </GamePageContainer>
    );
};