// import React from 'react';
// import classNames from 'classnames/bind';
// import styles from './ReviewSection.module.scss';

// const cx = classNames.bind(styles);

// function ReviewSection({ reviewsSummary }) {
//     if (!reviewsSummary) return null;

//     const {
//         overallScore,
//         totalReviews,
//         categories,
//         wifiScore,
//     } = reviewsSummary;

//     return (
//         <div className={cx('review-section')}>
//             <h2>Đánh giá của khách</h2>

//             <div className={cx('overall')}>
//                 <div className={cx('score')}>
//                     <span className={cx('value')}>{overallScore.toFixed(1)}</span>
//                     <span className={cx('text')}>Được đánh giá trên cả tuyệt vời</span>
//                 </div>
//                 <div className={cx('total-reviews')}>Tuyệt hảo · {totalReviews.toLocaleString()} đánh giá</div>
//                 <button className={cx('read-all')}>Đọc tất cả đánh giá</button>
//             </div>

//             <div className={cx('categories')}>
//                 {categories.map(cat => (
//                     <div key={cat.name} className={cx('category')}>
//                         <span className={cx('cat-name')}>{cat.name}</span>
//                         <span className={cx('cat-score')}>{cat.score.toFixed(1)}</span>
//                     </div>
//                 ))}
//                 <div className={cx('category')}>
//                     <span className={cx('cat-name')}>WiFi miễn phí</span>
//                     <span className={cx('cat-score')}>{wifiScore.toFixed(1)}</span>
//                 </div>
//             </div>

//             <div className={cx('topic-filter')}>
//                 <span>Chọn chủ đề để đọc đánh giá:</span>
//                 {/* Có thể thêm button hoặc select để lọc */}
//             </div>
//         </div>
//     );
// }

// export default ReviewSection;
import React from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewSection.module.scss';

const cx = classNames.bind(styles);

function ReviewSection({ reviewsSummary }) {
    if (!reviewsSummary) return null;

    const {
        overallScore = 0,
        totalReviews = 0,
        categories = [],
        wifiScore = 0,
    } = reviewsSummary;

    return (
        <div className={cx('review-section')}>
            <h2>Đánh giá của khách</h2>

            <div className={cx('overall')}>
                <div className={cx('score')}>
                    <span className={cx('value')}>
                        {Number(overallScore).toFixed(1)}
                    </span>
                    <span className={cx('text')}>
                        Được đánh giá trên cả tuyệt vời
                    </span>
                </div>

                <div className={cx('total-reviews')}>
                    Tuyệt hảo · {Number(totalReviews).toLocaleString()} đánh giá
                </div>

                <button className={cx('read-all')}>
                    Đọc tất cả đánh giá
                </button>
            </div>

            <div className={cx('categories')}>
                {categories.length > 0 ? (
                    categories.map((cat, index) => (
                        <div key={cat.name || index} className={cx('category')}>
                            <span className={cx('cat-name')}>{cat.name}</span>
                            <span className={cx('cat-score')}>
                                {Number(cat.score ?? 0).toFixed(1)}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className={cx('empty')}>
                        Chưa có đánh giá chi tiết
                    </div>
                )}

                <div className={cx('category')}>
                    <span className={cx('cat-name')}>WiFi miễn phí</span>
                    <span className={cx('cat-score')}>
                        {Number(wifiScore).toFixed(1)}
                    </span>
                </div>
            </div>

            <div className={cx('topic-filter')}>
                <span>Chọn chủ đề để đọc đánh giá:</span>
            </div>
        </div>
    );
}

export default ReviewSection;
