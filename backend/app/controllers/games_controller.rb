class GamesController < ApplicationController
    def index
        @title = 'test';
    end

    def check_combination
        @rows = 4
        @cols = 4
        board = Array.new(@rows) {Array.new(@cols)}
        for r in 0..@rows - 1
            c=0
            for c in 0..@cols - 1
                board[r][c] = self.randomGenerator
            end
        end

        # board = [
        #     ["L", "D", "S", "L"],
        #     ["O", "I", "E", "R"],
        #     ["W", "H", "S", "R"],
        #     ["S", "E", "Q", "N"],
        # ]
        
        @results=[]
        visited = Array.new(@rows) {Array.new(@cols, false)}
        str = ""
        for i in 0..board.length - 1
            for j in 0..board[i].length - 1
              self.check_words(board, visited, i, j, str)
            end
        end
        @records = Game.where(words: @results).pluck(:words)

        render json: {
            board: board,
            boardLength: board.length,
            results: @records
        }
    end

    def randomGenerator
        charset = %w{ A C D E F G H J K M N P Q R T V W X Y Z}
        return charset.sample
    end
    
    def check_words(board, visited, i, j, str)
        visited[i][j] = true
        str = str + board[i][j]

        @results.push(str)

        for row in  (i-1)..(i+1)
            if(row < @rows)
                for col in  (j-1)..(j+1)
                    if(col < @cols)
                        if (row >= 0 && col >= 0 && !visited[row][col] && str.size <= 7)
                            self.check_words(board,visited,row,col,str)
                        end
                    end
                end
            end
        end
        str = "" + str[str.length-1]
        visited[i][j] = false
    end

    def dictionary
        @dictionaries = Game.pluck(:words);
        render json: @dictionaries;
    end

end
