import { ISource, ISourceResponse } from 'types/interfaces';
import './sources.css';

class Sources {
    draw(data: ISource[]) {
        if (!data || !data.length) {
            console.error('No sources available to display');
            return;
        }

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp not found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (sourceName) sourceName.textContent = item.name;
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id || '');

            fragment.appendChild(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.innerHTML = '';
            sourcesContainer.appendChild(fragment);
        } else {
            console.error('Container .sources not found');
        }
    }
}

export default Sources;
