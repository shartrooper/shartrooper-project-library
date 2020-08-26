/*

	This is the 'handler' constructor
	to create and fetch books


*/

function BookHandler(){
	
	this.mapBookCollection= (collection)=>{
		const newCollection= collection.map(book=>{
			let {_id,title,comments}=book;
			return {_id,title, commentcount: comments.length};
		});
		
		return newCollection;
	}
	
	this.addComment= (comments,newComment)=>{
		return [...comments,newComment];
	}
}


module.exports = BookHandler;