const fs = require('fs-extra');
const path = require('path');

async function restructureNextJs() {
    const rootDir = process.cwd();
    
    // Definizione dei percorsi
    const srcDir = path.join(rootDir, 'src');
    const appDir = path.join(rootDir, 'app');
    const backupDir = path.join(rootDir, 'pre_restructure_backup');

    try {
        // Crea backup di sicurezza
        console.log('📦 Creazione backup...');
        await fs.copy(srcDir, backupDir);
        
        // Crea la nuova cartella app se non esiste
        await fs.ensureDir(appDir);

        // Sposta i file principali da src/app a app/
        console.log('🚀 Spostamento file principali...');
        const appFiles = ['layout.tsx', 'page.tsx', 'globals.css', 'favicon.ico'];
        for (const file of appFiles) {
            const srcPath = path.join(srcDir, 'app', file);
            const destPath = path.join(appDir, file);
            if (await fs.pathExists(srcPath)) {
                await fs.move(srcPath, destPath, { overwrite: true });
            }
        }

        // Sposta la cartella shop se esiste
        const shopSrcPath = path.join(srcDir, 'app', 'shop');
        const shopDestPath = path.join(appDir, 'shop');
        if (await fs.pathExists(shopSrcPath)) {
            await fs.move(shopSrcPath, shopDestPath);
        }

        // Sposta la cartella fonts se esiste
        const fontsSrcPath = path.join(srcDir, 'app', 'fonts');
        const fontsDestPath = path.join(appDir, 'fonts');
        if (await fs.pathExists(fontsSrcPath)) {
            await fs.move(fontsSrcPath, fontsDestPath);
        }

        // Crea cartelle necessarie in app
        console.log('📁 Creazione struttura cartelle in app...');
        const appDirs = ['components', 'lib', 'utils'];
        for (const dir of appDirs) {
            await fs.ensureDir(path.join(appDir, dir));
        }

        // Sposta i componenti rilevanti
        console.log('🔄 Spostamento componenti...');
        await fs.copy(path.join(srcDir, 'components'), path.join(appDir, 'components'));

        // Sposta utils e lib
        if (await fs.pathExists(path.join(srcDir, 'lib'))) {
            await fs.copy(path.join(srcDir, 'lib'), path.join(appDir, 'lib'));
        }

        // Gestione file di configurazione
        console.log('⚙️ Aggiornamento configurazioni...');
        
        // Mantieni questi file nella root
        const rootFiles = [
            'next.config.ts',
            'package.json',
            'tsconfig.json',
            'tailwind.config.ts',
            'postcss.config.mjs'
        ];

        // Aggiorna il middleware se esiste
        const middlewareSrc = path.join(srcDir, 'middleware.ts');
        if (await fs.pathExists(middlewareSrc)) {
            await fs.move(middlewareSrc, path.join(rootDir, 'middleware.ts'), { overwrite: true });
        }

        console.log('✅ Ristrutturazione completata!');
        console.log('\nPassaggi successivi consigliati:');
        console.log('1. Verifica che l\'applicazione funzioni correttamente');
        console.log('2. Aggiorna i percorsi di importazione nei file');
        console.log('3. Rimuovi la cartella src se tutto funziona');
        console.log('4. Il backup è disponibile in: pre_restructure_backup');
        
    } catch (error) {
        console.error('❌ Errore durante la ristrutturazione:', error.message);
        // Rollback in caso di errore
        if (await fs.pathExists(backupDir)) {
            console.log('🔄 Esecuzione rollback...');
            await fs.remove(appDir);
            await fs.copy(backupDir, srcDir);
        }
    }
}

restructureNextJs();