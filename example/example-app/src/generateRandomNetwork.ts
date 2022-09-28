import { range } from "lodash";

export const generateRandomNetwork = (numRowCats = 0, numColCats = 0) => {
    const nRow = 100;
    const nCol = 200;
    const nGroupDepth = 10;
    const nLink = 10000;

    const getRandomNumArray = (size: number) => {
        return Array(size).fill(0).map(() => Math.random() * 2 - 1)
    }

    const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

    const makeCatColors = (cats: number, num: number) => {
        const makeColors = (i: number) => {
            return {
                [`${i}-1`]: `#${getRandomColor()}`,
                [`${i}-2`]: `#${getRandomColor()}`,
            }
        }

        return range(cats).reduce((acc, i) => {
            acc[`cat-${i}`] = makeColors(i)
            return acc;
        }, {} as Record<string, Record<string, string>>)
    }

    const makeCategories = (n: number) => {
        return range(n).reduce((acc, i) => {
            acc[`cat-${i}`] = Math.random() > 0.5 ? `${i}-1` : `${i}-2` // 50/50 chance to be in one category or the other
            return acc;
        }, {} as Record<string, string>)
    }

    const makeNodes = (n: number, nCats: number, name: string) => Array(n).fill(0).map((_, i) => ({
        name: `ROW-${i}`,
        clust: i,
        group: Array(nGroupDepth).fill(0).map((_, d) => Math.round(i / 2 ** d)),
        ...makeCategories(nCats),
    }))

    return {
        mat: Array(nRow).fill([]).map(() => getRandomNumArray(nCol)),
        row_nodes: makeNodes(nRow, numRowCats, "ROW"),
        col_nodes: makeNodes(nCol, numColCats, "COL"),
        links: Array(nLink).fill(0).map(_ => ({
            source: Math.round(Math.random() * nRow),
            target: Math.round(Math.random() * nCol),
            value: Math.random() * 2 - 1,
        })),
        cat_colors: {
            row: makeCatColors(numRowCats, nRow),
            col: makeCatColors(numColCats, nCol),
        },
    }
}