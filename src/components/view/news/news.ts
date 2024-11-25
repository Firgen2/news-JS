import { IArticle } from 'types/interfaces';
import './news.css';

class News {
    draw(data: IArticle[]) {
        const news = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found');
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            if (newsItem && idx % 2 === 1) {
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name || 'Unknown';
            }

            const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (metaDate && item.publishedAt) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descriptionTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title || 'No title available';
            }

            const descriptionSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name || 'Unknown source';
            }

            const descriptionContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (descriptionContent) {
                descriptionContent.textContent = item.description || 'No description available';
            }

            const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url || '#');
            }

            fragment.appendChild(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('Container .news not found');
        }
    }
}

export default News;
