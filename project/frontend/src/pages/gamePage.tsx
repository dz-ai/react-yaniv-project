import {getCard, usePlayersCards} from "../hooks/usePlayersCards";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Player} from "../components/player/player";
import {CardComponent} from "../components/card/card";
import {GamePageContainer, MainGameContainer, UpAndDownPlayersCont, SideCont, Deck} from "./gamePageStyle";
import {useAppDispatch, useAppSelector} from "../store/features/hooks/reduxHooks";
import {addToDeck} from "../store/features/gameSlice";
import {initPlayers} from "../store/features/playersSlice";
import {Card} from "../interfaces/card";
import {IPlayer} from "../interfaces/player";

export function GamePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const yourName = location.state.yourName;
    const numOfPlayers = location.state.numOfPlayers

    const dispatch = useAppDispatch();
    const currentPlayer = useAppSelector(state => state.playersSlice);
    const deck = useAppSelector(state => state.gameSlice.deck);

    const {players, cards} = usePlayersCards(yourName, numOfPlayers);
    const [playersList, setPlayersList] = useState<IPlayer[]>([]);
    const [showStartGameButton, setShowStartGameButton] = useState(true);

    useEffect(() => {
        setPlayersList(players);
    }, [currentPlayer, players]);

    useEffect(() => {
        dispatch(initPlayers(playersList[0]));
    }, [playersList]);

    useEffect(() => {
        playersList[0] = currentPlayer;
        setPlayersList([...playersList]);
    }, [currentPlayer]);

    const handleStateGame = (): void => {
        setShowStartGameButton(false);
        const card: Card = getCard(cards);
        console.log(card);
        dispatch(addToDeck(card));
    };

    return (
        <GamePageContainer>

            <header style={{border: '3px solid gray'}}>
                Game
                <button onClick={() => navigate(-1)}>Reset Game</button>
            </header>

            <MainGameContainer style={{border: '3px solid gray'}}>
                <SideCont style={{border: '3px solid blue'}}>
                    {playersList[1] &&  <Player player={playersList[1]} isYou={false} playerIndex={1}/>}
                </SideCont>

                <UpAndDownPlayersCont style={{border: '3px solid purple'}}>
                    <div style={{border: '3px solid red'}}>
                        {playersList[2] && <Player player={playersList[2]} isYou={false} playerIndex={2}/>}
                    </div>

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