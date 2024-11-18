const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function findAndReplacePaths() {
    try {
        // Cerca tutti i file che contengono '/shop/'
        const { stdout: grepOutput } = await execAsync('grep -r "/shop/" . --exclude-dir={node_modules,.next,.git}');
        
        const findings = grepOutput.split('\n').filter(Boolean);
        
        console.log('\n🔍 File che contengono riferimenti a "/shop/":\n');
        
        const filesToUpdate = new Map();
        
        findings.forEach(finding => {
            const [file, ...contentArr] = finding.split(':');
            const content = contentArr.join(':');
            
            if (!filesToUpdate.has(file)) {
                filesToUpdate.set(file, []);
            }
            filesToUpdate.get(file).push(content.trim());
        });

        for (const [file, contents] of filesToUpdate) {
            console.log(`\nFile: ${file}`);
            contents.forEach(content => {
                console.log(`  └─ ${content}`);
            });
        }

        console.log('\n🔄 Inizia la sostituzione...\n');

        for (const [file, _] of filesToUpdate) {
            try {
                let content = await fs.readFile(file, 'utf8');
                
                // Crea backup del file
                await fs.writeFile(`${file}.backup`, content);
                
                // Sostituisci i percorsi
                content = content.replace(/\/shop\//g, '/(shop)/');
                
                // Scrivi il file aggiornato
                await fs.writeFile(file, content);
                
                console.log(`✅ Aggiornato: ${file}`);
            } catch (err) {
                console.error(`❌ Errore nell'aggiornamento di ${file}:`, err);
            }
        }

        console.log('\n✨ Processo completato!');
        console.log('📝 Backup dei file originali creati con estensione .backup');
        console.log('\nPer ripristinare un file, usa:');
        console.log('mv file.backup file\n');

    } catch (error) {
        if (error.stderr && error.stderr.includes('No such file or directory')) {
            console.log('✨ Nessun riferimento a "/shop/" trovato nei file.');
        } else {
            console.error('❌ Errore durante la ricerca:', error);
        }
    }
}

findAndReplacePaths();