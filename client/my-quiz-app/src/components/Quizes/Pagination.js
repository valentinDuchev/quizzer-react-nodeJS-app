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