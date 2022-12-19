import {getCard, usePlayersCards} from "../../hooks/usePlayersCards";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Player} from "../player/player";
import {CardComponent} from "../card/card";
import {GamePageContainer, MainGameContainer, UpAndDownPlayersCont, SideCont, Deck} from "./gamePageStyle";
import {ICard} from "../../interfaces/ICard";
import {IPlayer} from "../../interfaces/IPlayer";
import {useGameStateIndex} from "../../store/features/gameSlice/useGameStateIndex";
import {useWhoIsTurn} from "../../store/features/gameSlice/useWhoIsTurn";
import {useGameRules} from "./useGameRules";
import {usePlayerStateIndex} from "../../store/features/playersSlice/usePlayerStateIndex";


export function GameComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const yourName = location.state.yourName;
    const numOfPlayers = location.state.numOfPlayers;

    const {players, cards} = usePlayersCards(yourName, numOfPlayers);

    ///// PLAYER STATE /////
    const {playerState, playerStateFun} = usePlayerStateIndex();
    const currentPlayer = playerState;
    const {initPlayers} = playerStateFun;

    ///// GAME STATE //////
    const {gameState, gameStateFun} = useGameStateIndex();
    const {whoIsTurn, deck, gameIsOn} = gameState;
    const {startGame, addToDeck} = gameStateFun;

    const whoIsTurnFun = useWhoIsTurn();
    const gameRules = useGameRules();

    const [isFirstRound, setIsFirstRound] = useState(true);
    const [playersList, setPlayersList] = useState<IPlayer[]>([]);
    const [showStartGameButton, setShowStartGameButton] = useState(true);

    const handleStartGame = (): void => {
        setShowStartGameButton(false);
        const card: ICard = getCard(cards);
        startGame();
        addToDeck(card);
    };

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

// who is turning
    useEffect(() => {
        whoIsTurnFun(numOfPlayers, isFirstRound);
        isFirstRound && setIsFirstRound(false);
    }, []);

// log who and current
    useEffect(() => {
        //console.log(whoIsTurn);
        console.log(currentPlayer);
    }, [whoIsTurn, currentPlayer]);

// setPlayersList(players);
    useEffect(() => {
        setPlayersList(players);
    }, [currentPlayer, players]);

// initPlayers(playersList[whoIsTurn]);
    useEffect(() => {
            initPlayers(playersList[whoIsTurn]);
        }, [playersList, whoIsTurn]);

// update current player to playersList
    useEffect(() => {
        playersList[whoIsTurn] = currentPlayer;
        setPlayersList([...playersList]);
    }, [currentPlayer]);

    useEffect(() => {
        console.log(deck)
    }, [gameState]);


    useEffect(() => {
        gameRules(deck, playersList[whoIsTurn].playerCards);
    }, [deck.length, currentPlayer.playerCards.length, whoIsTurn, gameIsOn]);


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