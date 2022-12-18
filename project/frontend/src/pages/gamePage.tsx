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

    const {gameState, gameStateFun} = useGameStateIndex();
    const {whoIsTurn, deck} = gameState;
    const {startGame, addToDeck} = gameStateFun;

    const currentPlayer = useAppSelector(state => state.playersSlice);

    const {players, cards} = usePlayersCards(yourName, numOfPlayers);

    const [isFirstRound, setIsFirstRound] = useState(true);
    const [playersList, setPlayersList] = useState<IPlayer[]>([]);
    const [showStartGameButton, setShowStartGameButton] = useState(true);

    const handleTurn = useCallback(() => {
            setPlayersList((prevPlayersList) => {
                prevPlayersList[whoIsTurn] = {
                    ...prevPlayersList[whoIsTurn],
                    isYourTurn: false,
                };
                return [...prevPlayersList];
            });
            whoIsTurnFun(playersList.length, isFirstRound);
            isFirstRound && setIsFirstRound(false);
        }
        , [whoIsTurn, isFirstRound, playersList.length]);

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
        },
        [playersList, whoIsTurn]);

    useEffect(() => {
        playersList[whoIsTurn] = currentPlayer;
        setPlayersList([...playersList]);
    }, [currentPlayer]);

    const handleStartGame = (): void => {
        setShowStartGameButton(false);
        const card: ICard = getCard(cards);
        startGame();
        addToDeck(card);
    };

    return (
        <GamePageContainer>

            <header>
                Game
                <button onClick={() => navigate(-1)}>Reset Game</button>
                <button onClick={handleTurn}>turn</button>
            </header>

            <MainGameContainer>
                <SideCont>
                    {playersList[1] && <Player player={playersList[1]} isYou={false} playerIndex={1}/>}
                </SideCont>

                <UpAndDownPlayersCont>
                    <div>
                        {playersList[2] && <Player player={playersList[2]} isYou={false} playerIndex={2}/>}
                    </div>
                    {/* TODO make it to a separate component*/}
                    <Deck>
                        {showStartGameButton && <button onClick={handleStartGame}>Start Game</button>}
                        {!showStartGameButton &&
                            deck.map(card =>
                                <CardComponent
                                    isYourTurn={whoIsTurn === 0}
                                    card={card}
                                    key={`${card.num}${card.symbol}`}
                                    src={`../../cardsImages/${card.symbol}/${card.num}.png`}
                                    alt={'deck cards'}
                                    playerIndex={6}/>)
                        }
                    </Deck>

                    <div>
                        {playersList[0] && <Player player={playersList[0]} isYou={true} playerIndex={0}/>}
                    </div>
                </UpAndDownPlayersCont>

                <SideCont>
                    {playersList[3] && <Player player={playersList[3]} isYou={false} playerIndex={3}/>}
                </SideCont>
            </MainGameContainer>

        </GamePageContainer>
    );
};