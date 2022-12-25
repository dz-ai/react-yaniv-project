import {getCard, usePlayersCardsCreator} from "../../Hooks-and-Util/usePlayersCardsCreator";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Player} from "../player/player";
import {CardComponent} from "../card/card";
import {GamePageContainer, MainGameContainer, UpAndDownPlayersCont, SideCont, Deck} from "./gamePageStyle";
import {ICard} from "../../interfaces/ICard";
import {IPlayer} from "../../interfaces/IPlayer";
import {useGameStateIndex} from "../../store/features/gameSlice/useGameStateIndex";
import {useWhoIsTurn} from "../../Hooks-and-Util/useWhoIsTurn";
import {useGameRules} from "../../Hooks-and-Util/useGameRules";
import {usePlayerStateIndex} from "../../store/features/playersSlice/usePlayerStateIndex";
import {numToStringConvertor} from "../../Hooks-and-Util/utilsFun";


export function GameComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const yourName = location.state.yourName;
    const numOfPlayers = location.state.numOfPlayers;

    const {players, cards} = usePlayersCardsCreator(yourName, numOfPlayers);

    ///// PLAYER STATE /////
    const {playerState, playerStateFun} = usePlayerStateIndex();
    const currentPlayer = playerState;
    const {initPlayers} = playerStateFun;

    ///// GAME STATE //////
    const {gameState, gameStateFun} = useGameStateIndex();
    const {whoIsTurn, deck, gameIsOn, throwCount} = gameState;
    const {startGame, addToDeck, throwCountUp} = gameStateFun;

    const whoIsTurnFun = useWhoIsTurn();
    const gameRules = useGameRules();

    const [isFirstRound, setIsFirstRound] = useState(true);
    const [playersList, setPlayersList] = useState<IPlayer[]>([]);
    const [showStartGameButton, setShowStartGameButton] = useState(true);

    const handleStartGame = (): void => {
        //throwCountUp(0);
        setShowStartGameButton(false);

        const card: ICard = getCard(cards);

        addToDeck(card);
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
                    {/* TODO make it to a separate component*/}
                    <Deck>
                        {showStartGameButton &&
                            <button
                                onClick={handleStartGame}
                                disabled={players.length === 0}>
                                Start Game
                            </button>}
                        {!showStartGameButton &&
                            deck.map(card =>
                                card.symbol !== '' && card.num !== '' &&
                                <CardComponent
                                    isYourTurn={whoIsTurn === 0}
                                    card={card}
                                    key={`${card.num}${card.symbol}`}
                                    src={`../../cardsImages/${card.symbol}/${numToStringConvertor(card.num)}.png`}
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
}