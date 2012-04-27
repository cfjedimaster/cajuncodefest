<sql>
<statement>
create table if not exists lifelog(id integer primary key autoincrement, 
								   recorded date,
								   food int, 
								   exercise int)
</statement>
</sql>