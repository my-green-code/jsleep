const fs = require('fs');
const path = require('path');

function addJsExtensions(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            addJsExtensions(fullPath);
            return;
        }
        
        if (file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Add .js to relative imports that don't already have it
            content = content.replace(
                /from\s+['"](\.[^'"]+)['"]/g,
                (match, p1) => {
                    if (p1.endsWith('.js')) return match;
                    return `from '${p1}.js'`;
                }
            );
            fs.writeFileSync(fullPath, content);
        }
    });
}

// Run on dist directory
addJsExtensions('./dist');