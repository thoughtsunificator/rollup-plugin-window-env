import fs from "fs"
import { createConfig } from "@thoughtsunificator/config-env"

export default function(config = {}) {
	const { envPath = ".env.json", configPath = "data/config.json", namespace = "window", namespaceKey = null } = config
	return {
		name: 'rollup-env',
		buildStart(){
			if (fs.existsSync(envPath)) {
				this.addWatchFile(envPath)
			}
			if (fs.existsSync(configPath)) {
				this.addWatchFile(configPath)
			}
		},
		banner: () => {
			const config = createConfig(envPath, configPath)
			let str = ";(function() {"
			str += `if(!${namespace})globalThis["${namespace}"]={};`
			if(namespaceKey) {
				str += `${namespace}["${namespaceKey}"]={};`
			}
			let key = ""
			if(namespaceKey) {
				key = `${namespace}["${namespaceKey}"]`
			} else {
				key = namespace
			}
			for(const property in config) {
				str += `${key}["${property}"]=${JSON.stringify(config[property])};`
			}
			str += "})();"
			return str
		}
	};
}
