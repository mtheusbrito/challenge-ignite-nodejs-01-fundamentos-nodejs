import axios from "axios";
import { parse } from "csv-parse";
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
    delimiter: ',',
    skip_empty_lines: true,
    from_line: 2,
});

async function run(){
    const linesParse = stream.pipe(csvParse);
    for await (const line of linesParse){
        const [title, description ] = line;

        await axios.post('http://localhost:3333/tasks', {
            title,
            description
        })
    }
}
run();