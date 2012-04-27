var DBController = function() {

    var db,success,failure;
    
    return {

        init:function(name,importscript,successHandler)    {
            //todo - allow for version
            db = window.openDatabase(name,"1.0",name,100000);            
            if(typeof importscript !== "undefined") {
                console.log("being asked to run a script");
                if(typeof successHandler === "undefined") throw "Invalid call - must pass success handler when importing data";
                this.executeBatch(importscript,successHandler);
            }
        },

        executeBatch:function(path,successHandler,errorHandler) {
            success=successHandler;
            failure=errorHandler;
            
            $.get(path, {}, this.gotFile, "xml");
        },

        //sql, successHandler, errorHandler are required
        executeSql:function(sql,args,successHandler,errorHandler) {
            console.log('going to run '+sql+ ' '+arguments.length);
            //Don't like this - but way to make args be optional and in 2nd place
            if(arguments.length == 3) {
                successHandler = arguments[1];
                errorHandler = arguments[2];
                args = [];
            }
            db.transaction(
                function(tx) { tx.executeSql(sql,args,function(tx,res) {
                    //todo - figure out fraking scoping rules and why line below didnt work, nor this.X
                    //res = translateResultSet(res);
                    var result = [];
                    for(var i=0; i<res.rows.length; i++) {
                        result.push(res.rows.item(i));
                    }
                    successHandler(result);
                })}
            , errorHandler)    
        },
        
            
        gotFile:function(doc) {
            var statements = [];
            var statementNodes=doc.getElementsByTagName("statement");
            for(var i=0; i<statementNodes.length; i++) {
                statements.push(statementNodes[i].textContent);
            }
            if(statements.length) {
                db.transaction(function(tx) {
                    //do nothing
                    for(var i=0;i<statements.length;i++) {
                        tx.executeSql(statements[i]);
                    }
                }, failure,success);
            }
        },
        
        translateResultSet:function(res) {
            var result = [];
            for(var i=0; i<res.rows.length; i++) {
                result.push(res.rows.item(i));
            }
            return result;
            
        }
            
    }
    
};