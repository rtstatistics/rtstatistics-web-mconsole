/// <reference path="../../typings/index.d.ts" />

import Mustache = require('mustache');

export class TemplateCompiler{
    /*
    static compile(templatePath: string, subTemplatePaths?: any, parameters?: any): string{
        let template = require(templatePath);
        let context = {};

        if (subTemplatePaths == null && parameters == null){
            return template;
        }

        if (subTemplatePaths != null){
            for(let key in subTemplatePaths){
                context[key] = require(subTemplatePaths[key]);
            }
        }
        if (parameters != null){
            Object.assign(context, parameters);
        }
        return Mustache.render(template, context);
    }
    */

    /**
     * Compile the template. Variables in the template are supposed to be
     * surranded by '<<' and '>>'.
     */
    static compile(template: string, context?: any): string{
        if (context == null){
            return template;
        }

        Mustache.parse(template, ['<<', '>>']);
        let output = Mustache.render(template, context);
        //console.log(output);
        return output;
    }

}