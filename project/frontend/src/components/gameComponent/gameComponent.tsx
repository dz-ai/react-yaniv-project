import {getCard, usePlayersCardsCreator} from "../../Hooks-and-Util/usePlayersCardsCreator";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Player} from "../player/player";
import {GamePageContainer, MainGameContainer, UpAndDownPlayersCont, SideCont} from "./gamePageStyle";
import {ICard} from "../../interfaces/ICard";
import {IPlayer} from "../../interfaces/IPlayer";
import {useGameStateIndex} from "../../store/features/gameSlice/useGameStateIndex";
import {useWhoIsTurn} from "../../Hooks-and-Util/useWhoIsTurn";
import {useGameRules} from "../../Hooks-and-Util/useGameRules";
import {usePlayerStateIndex} from "../../store/features/playersSlice/usePlayerStateIndex";
import {Deck} from "../deck/Deck";


export function GameComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const yourName = location.state.yourName;
    const numOfPlayers = location.state.numOfPlayers;

    const {players, cards} = usePlayersCardsCreator(yourName, numOfPlayers);

    ///// PLAYER STATE /////
    const {playerState, playerStateFun} = usePlayerStateIndex();
    const currentPlayer = playerState;
    const {initPlayers, addToPlayer} = playerStateFun;

    ///// GAME STATE //////
    const {gameState, gameStateFun} = useGameStateIndex();
    const {whoIsTurn, deck, gameIsOn, throwCount} = gameState;
    const {startGame, addToDeck, throwCountUp} = gameStateFun;

    //// GAME MOVEMENTS ////
    const whoIsTurnFun = useWhoIsTurn();
    const gameRules = useGameRules();

    ///// LOCAL STATES /////
    const [isFirstRound, setIsFirstRound] = useState(true);
    const [playersList, setPlayersList] = useState<IPlayer[]>([]);
    const [showStartGameButton, setShowStartGameButton] = useState<boolean>(true);

    /// LOGIC ///
    const handleStartGame = (): void => {
        setShowStartGameButton(false);

        const card: ICard = getCard(cards);

        addToDeck({symbol: 'Clubs', num: 1});
        startGame();
    };

    const handleTurn = useCallback(() => {
            throwCountUp(0);

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

    const handleCacheButton = (): void => {
        const card: ICard = getCard(cards);
        console.log(card)
        addToPlayer(card);
        setTimeout(() => {
            handleTurn();
        }, 1000)
    };


// who is turning
    useEffect(() => {
        whoIsTurnFun(numOfPlayers, isFirstRound);
        isFirstRound && setIsFirstRound(false);
    }, []);

// log who and current
    useEffect(() => {
        console.log(deck);
        console.log(currentPlayer);
    }, [whoIsTurn, currentPlayer, deck]);

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
    }, [currentPlayer, currentPlayer.playerCards, currentPlayer.playerCards.length]);

    useEffect(() => {
        gameRules(deck, playersList[whoIsTurn].playerCards);
    }, [currentPlayer.playerCards.length, whoIsTurn, gameIsOn]);


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

                    <Deck
                        showStartGameButton={showStartGameButton}
                        handleStartGame={handleStartGame}
                        players={players}
                        deck={deck}
                        whoIsTurn={whoIsTurn}
                    />

                    <div>
                        {playersList[0] &&
                            <Player
                                player={playersList[0]}
                                isYou={true} playerIndex={0}
                                whoIsTurn={whoIsTurn}
                                handleCacheButton={handleCacheButton}/>}
                    </div>
                </UpAndDownPlayersCont>

                <SideCont>
                    {playersList[3] && <Player player={playersList[3]} isYou={false} playerIndex={3}/>}
                </SideCont>
            </MainGameContainer>

        </GamePageContainer>
    );
}