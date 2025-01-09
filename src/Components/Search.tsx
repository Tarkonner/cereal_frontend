import {useEffect, useState} from "react";

type FilterableObject = Record<string, unknown>;

interface FilterComponentProps<T> {
    array: T[];
    query: string;
    key: keyof T;
}

export const FilterComponent =
    <T extends FilterableObject>({
        array,
        query,
        key,
    }: FilterComponentProps<T>) => {
        /* Debouncing User Input
        When performing a filter based on user input, you may not want to trigger the search immediately on every keystrok */
        const [debouncedQuery, setDebouncedQuery] = useState(query);

        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedQuery(query);
            }, 300); // Adjust debounce delay as needed
            return () => clearTimeout(timer);
        }, [query]);

        const filteredArray = array.filter(item => {
            const value = item[key];
            return typeof value === "string" && value.toLowerCase().includes(debouncedQuery.toLowerCase());
        });

        return (
            <div>
                <h3>Filtered Results:</h3>
                <ul>
                    {filteredArray.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>
            </div>
        );
};