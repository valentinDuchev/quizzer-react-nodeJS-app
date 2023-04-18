import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SingleQuizCard } from '../Cards/Single-quiz-card/SingleQuizCard';


export const PaginatedItems = (props) => {


    const { data } = props;

    const itemsPerPage = 6


    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);





    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    for (let element of currentItems) {
        if (element.topic == 'books') {
            element.topicEmoji = '📚'
        } else if (element.topic == 'sport') {
            element.topicEmoji = '⚽'
        } else if (element.topic == 'general') {
            element.topicEmoji = '⁉'
        } else if (element.topic == 'art') {
            element.topicEmoji = '🎨'
        } else if (element.topic == 'movies') {
            element.topicEmoji = '🎥'
        } else if (element.topic == 'music') {
            element.topicEmoji = '🎥'
        } else if (element.topic == 'history') {
            element.topicEmoji = '⚔️'
        } else if (element.topic == 'geography') {
            element.topicEmoji = '🌎'
        } else if (element.topic == 'science') {
            element.topicEmoji = '👨‍🔬'
        } else if (element.topic == 'politics') {
            element.topicEmoji = '⚖️'
        } else if (element.topic == 'human') {
            element.topicEmoji = '👨'
        } else if (element.topic == 'medicine') {
            element.topicEmoji = '💊'
        } else if (element.topic == 'animals') {
            element.topicEmoji = '🙊'
        } else if (element.topic == 'technology') {
            element.topicEmoji = '💻'
        } else if (element.topic == 'stocks') {
            element.topicEmoji = '₿'
        } else if (element.topic == 'food') {
            element.topicEmoji = '🍔'
        } else if (element.topic == 'other') {
            element.topicEmoji = ''
        }
    }

    return (
        <>
            {currentItems.map((quiz) =>
                <SingleQuizCard
                    key={quiz._id}
                    id={quiz._id}
                    author={quiz.author}
                    description={quiz.description}
                    difficulty={quiz.difficulty}
                    likes={quiz.likes}
                    dislikes={quiz.dislikes}
                    topic={quiz.topic}
                    raitng={quiz.rating}
                    solved={quiz.solved}
                    title={quiz.title}
                    email={quiz.authorEmail}
                    questionsNumber={quiz.questions.length}
                    rating={quiz.rating.toFixed(2)}
                    ratedNumber={quiz.ratedNumber}
                    dateCreated={quiz.dateCreated}
                    topicEmoji={quiz.topicEmoji}
                />)}


            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>
    );
}